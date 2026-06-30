
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CreatePromptCard from "../../components/createPrompt/CreatePromptCard";
import MainLayout from "../../layouts/MainLayout";

const UpdatePromptPage = () => {
  const { id } = useParams();

  const prompts = useSelector(
    (state) => state.user?.prompts || []
  );

  const promptData = prompts.find(
    (prompt) => prompt.id === id
  );

  if (!promptData) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          Prompt not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CreatePromptCard
        mod="update"
        Promptdata={promptData}
      />
    </MainLayout>
  );
};

export default UpdatePromptPage;

