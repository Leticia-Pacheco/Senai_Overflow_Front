import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import ReactEmbedGist from "react-embed-gist";
import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
  Logo,
  IconSignOut,
  FormNewQuestion,
  GistIcon,
  ContainerGist,
} from "./styles";

import Input from "../../components/Input";
import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";

import { api } from "../../services/api";
import { getUser, setUser, signOut } from "../../services/security";

import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Chips from "../../components/Chips";
import Loading from "../../components/Loading";
import { validSquaredImage } from "../../utils";
import SpinnerLoading from "../../components/SpinnerLoading";
import InputSearch from "../../components/inputSearch";

function Profile({ setIsLoading, handleReload, setMessage }) {
  const [student, setStudent] = useState(getUser());

  const handleImage = async (e) => {
    if (!e.target.files[0]) return;

    try {
      await validSquaredImage(e.target.files[0]);

      const data = new FormData();

      data.append("image", e.target.files[0]);

      setIsLoading(true);

      const response = await api.post(`/students/${student.id}/images`, data);

      setTimeout(() => {
        setStudent({ ...student, image: response.data.image });
        handleReload();
      }, 1000);

      setUser({ ...student, image: response.data.image });
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section>
        <img src={student.image || imgProfile} alt="Imagem de Perfil" />
        <label htmlFor="editImageProfile">Editar Foto</label>
        <input id="editImageProfile" type="file" onChange={handleImage} />
      </section>
      <section>
        <strong>NOME:</strong>
        <p>{student.name}</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>{student.ra}</p>
      </section>
      <section>
        <strong>E-MAIL:</strong>
        <p>{student.email}</p>
      </section>
    </>
  );
}

function Answer({ answer }) {
  const student = getUser();

  return (
    <section>
      <header>
        <img src={answer.Student.image || imgProfile} alt="Imagem de Perfil" />
        <strong>
          por{" "}
          {student.studentId === answer.Student.id
            ? "Você"
            : answer.Student.name}
        </strong>
        <p> {format(new Date(answer.created_at), "dd/MM/yyyy 'às' HH:mm")}</p>
      </header>
      <p>{answer.description}</p>
    </section>
  );
}

function Question({ question, setIsLoading, setCurrentGist }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(question.Answers);
  }, [question.Answers]);

  const qtdAnswers = answers.length;

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    if (newAnswer.length < 10)
      return alert("A resposta deve ter no mínimo 10 caracteres");

    setIsLoading(true);

    try {
      const response = await api.post(`/questions/${question.id}/answers`, {
        description: newAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
          image: aluno.image,
        },
      };

      setAnswers([...answers, answerAdded]);

      setNewAnswer("");

      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const student = getUser();

  return (
    <QuestionCard>
      <header>
        <img
          src={question.Student.image || imgProfile}
          alt="Imagem de perfil"
        />
        <strong>
          por{" "}
          {student.studentId === question.Student.id
            ? "Você"
            : question.Student.name}
        </strong>
        <p>
          em {format(new Date(question.created_at), "dd/MM/yyyy 'às' HH:mm")}
        </p>
        {question.gist && (
          <GistIcon onClick={() => setCurrentGist(question.gist)} />
        )}
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        {question.image && <img src={question.image} alt="Imagem da questão" />}
      </section>
      <footer>
        <h1 onClick={() => setShowAnswers(!showAnswers)}>
          {qtdAnswers === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdAnswers}
              {qtdAnswers > 1 ? " Respostas" : " Resposta"}
            </>
          )}
        </h1>
        {showAnswers && (
          <>
            {answers.map((answer) => (
              <Answer key={answer.id} answer={answer} />
            ))}
          </>
        )}
        <form onSubmit={handleAddAnswer}>
          <textarea
            minLength={10}
            placeholder="Responda essa dúvida!"
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            value={newAnswer}
          />
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function NewQuestion({ handleReload, setIsLoading }) {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
  });

  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [image, setImage] = useState(null);

  const imageRef = useRef();

  const categoriesRef = useRef();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (error) {
        alert(error);
      }
    };

    loadCategories();
  }, []);

  const handleCategories = (e) => {
    const idSel = e.target.value;

    const categorySel = categories.find((c) => c.id.toString() === idSel);

    if (categorySel && !categoriesSel.includes(categorySel))
      setCategoriesSel([...categoriesSel, categorySel]);

    e.target[e.target.selectedIndex].disabled = true;
    e.target.value = "";
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
      imageRef.current.style.display = "flex";
    } else {
      imageRef.current.src = "";
      imageRef.current.style.display = "none";
    }

    setImage(e.target.files[0]);
  };

  const handleUnselCategory = (idUnsel) => {
    setCategoriesSel(categoriesSel.filter((c) => c.id !== idUnsel));

    const { options } = categoriesRef.current;

    for (var i = 0; i < options.length; i++) {
      if (options[i].value === idUnsel.toString()) options[i].disabled = false;
    }
  };

  const handleInput = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.id]: e.target.value });
  };

  const handleAddNewQuestion = async (e) => {
    e.preventDefault();

    if (categoriesSel.length === 0) return alert("Selecione uma categoria");

    const data = new FormData();

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);

    const categories = categoriesSel.reduce((s, c) => (s += c.id + ","), "");

    data.append("categories", categories.substr(0, categories.length - 1));

    if (image) data.append("image", image);
    if (newQuestion.gist) data.append("gist", newQuestion.gist);

    setIsLoading(true);

    try {
      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      handleReload();
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <FormNewQuestion onSubmit={handleAddNewQuestion}>
      <Input
        id="title"
        label="Título"
        value={newQuestion.title}
        handler={handleInput}
        minLength="1"
        required
      />
      <Input
        id="description"
        label="Descrição"
        value={newQuestion.description}
        handler={handleInput}
        minLength="10"
        required
      />
      <Input
        id="gist"
        label="Gist"
        value={newQuestion.gist}
        minLength="20"
        handler={handleInput}
      />
      <Select
        id="categories"
        label="Categorias"
        handler={handleCategories}
        ref={categoriesRef}
      >
        <option value="">Selecione</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.description}
          </option>
        ))}
      </Select>
      <div>
        {categoriesSel.map((c) => (
          <Chips
            key={c.id}
            info={c.description}
            handleClose={() => handleUnselCategory(c.id)}
          ></Chips>
        ))}
      </div>
      <input type="file" onChange={handleImage} />
      <img alt="Pré-visualização" ref={imageRef} />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Gist({ gist, handleClose }) {
  if (gist) {
    const formatedGist = gist.split(".com/").pop();
    return (
      <Modal
        title="Exemplo de código"
        handleClose={() => handleClose(undefined)}
      >
        <ContainerGist>
          <ReactEmbedGist gist={formatedGist} />
        </ContainerGist>
      </Modal>
    );
  } else return null;
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingFeed, setIsLoadingFeed] = useState(false);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const [currentGist, setCurrentGist] = useState(undefined);

  const [page, setPage] = useState(1);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const [search, setSearch] = useState("");

  const feedRef = useRef();

  const loadQuestions = async (reload) => {
    //se já tiver buscando, não busca de novo
    if (isLoadingFeed) return;

    //se tiver chego no fim, não busca de novo
    if (totalQuestions > 0 && totalQuestions == questions.length) return;

    setIsLoadingFeed(true);

    const response = await api.get("/feed", {
      params: { page },
    });

    setPage(page + 1);

    setQuestions([...questions, ...response.data]);

    setTotalQuestions(response.headers["x-total-count"]);

    console.log(totalQuestions);

    setIsLoadingFeed(false);
  };

  useEffect(() => {
    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setShowNewQuestion(false);
    setIsLoading(false);
    setPage(1);
    setQuestions([]);
    setSearch("");
    setReload(Math.random());
  };

  const feedScrollObserver = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop + clientHeight > scrollHeight - 100 && search.length < 4)
      loadQuestions();
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);

    if (e.target.value.length === 0) handleReload();

    if (e.target.value.length < 4) return;

    try {
      const response = await api.get("/questions", {
        params: { search: e.target.value },
      });

      setQuestions(response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <Gist gist={currentGist} handleClose={setCurrentGist} />

      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => setShowNewQuestion(false)}
        >
          <NewQuestion
            handleReload={handleReload}
            setIsLoading={setIsLoading}
          />
        </Modal>
      )}
      <Container>
        <Header>
          <Logo src={logo} onClick={handleReload} />
          <InputSearch handler={handleSearch} value={search} />
          <IconSignOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile handleReload={handleReload} setIsLoading={setIsLoading} />
          </ProfileContainer>
          <FeedContainer ref={feedRef} onScroll={feedScrollObserver}>
            {questions.length === 0 &&
              search.length > 3 &&
              "Nenhuma questão encontrada"}
            {questions.map((q) => (
              <Question
                key={q.id}
                question={q}
                setIsLoading={setIsLoading}
                setCurrentGist={setCurrentGist}
              />
            ))}
            {isLoadingFeed && <SpinnerLoading />}
            {totalQuestions > 0 &&
              totalQuestions == questions.length &&
              "Isso é tudo"}
          </FeedContainer>
          <ActionsContainer>
            <button onClick={() => setShowNewQuestion(true)}>
              Fazer uma pergunta
            </button>
          </ActionsContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
