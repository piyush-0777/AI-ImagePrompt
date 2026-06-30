import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layouts/MainLayout";
import HeroSection from "../../components/hero/HeroSection";
import PromptGrid from "../../components/prompt/PromptGrid";

import { getPrompts } from "../../features/prompt/promptThunks";

import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";

function HomePage() {
  const dispatch = useDispatch();

  const { prompts, loading, error, hasMore } = useSelector(
    (state) => state.prompt
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPrompts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;

      if (bottom && !loading.list && hasMore) {
        const nextPage = page + 1;

        setPage(nextPage);

        dispatch(
          getPrompts({
            page: nextPage,
            limit: 10,
          })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading.list, hasMore, dispatch]);

  return (
    <MainLayout>
      <HeroSection />

      {error.list && <ErrorMessage message={error.list} />}

      <PromptGrid prompts={prompts} />

      {loading.list && <Spinner />}
    </MainLayout>
  );
}

export default HomePage;