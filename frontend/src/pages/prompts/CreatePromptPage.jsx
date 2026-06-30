
import CreatePromptCard from "../../components/createPrompt/CreatePromptCard";
import MainLayout from "../../layouts/MainLayout";
 const CreatePromptPage = () =>{


  return (
    <MainLayout>
      <CreatePromptCard
      mod = 'create'
      Promptdata = 'null'
      />
    </MainLayout>
  );
}

export default CreatePromptPage;