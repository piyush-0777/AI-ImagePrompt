import Container from "../common/Container";

function Footer() {
  return (
    <footer
      className="
      mt-20
      border-t
      dark:border-zinc-800
      "
    >
      <Container>
        <div
          className="
          py-10
          text-center
          text-zinc-500
          "
        >
          © 2026 MyPrompt.
          All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;