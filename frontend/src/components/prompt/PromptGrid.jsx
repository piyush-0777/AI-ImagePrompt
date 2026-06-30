import PromptCard from "./PromptCard";
import Container from "../common/Container";

function PromptGrid({ prompts = [] }) {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </Container>
  );
}

export default PromptGrid;