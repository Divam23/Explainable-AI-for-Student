//react import
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//shadcn component import
import Flowbox from "@/components/Flowbox";
import { HoverCard } from "@/components/HoverCard";

import { MdDarkMode, MdLightMode } from "react-icons/md";

//utils import
import { designFlowData as data } from "@/utils/designFlowData";
import { featuresData as feature } from "@/utils/featuresData";
// import { educationFeeds } from "@/utils/EducationFeeds";
// import { NewsCard } from "@/components/NewsCard";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return (
    <>
      <div
        className="
                  main-container
                  min-w-100
                  h-auto p-5
                  overflow-visible
                  text-prussian-500 dark:text-alabaster-900

                  bg-alabaster-900
                  bg-[radial-gradient(circle_at_top_left,var(--color-prussian-900),transparent_70%),radial-gradient(circle_at_bottom_right,var(--color-prussian-900),transparent_70%)]

                  dark:bg-prussian-100
                  dark:bg-[radial-gradient(circle_at_top_left,var(--color-prussian-300),transparent_75%),radial-gradient(circle_at_bottom_right,var(--color-prussian-300),transparent_75%)]"
      >
        <nav className="nav-heading w-full h-full bg-transparent font-fredoka flex sm:flex-wrap sm:flex-auto items-center justify-between pl-20 pr-20 font-semibold">
          <div className="title hidden md:flex flex-col  text-prussian-500 dark:text-alabaster-900 text-3xl">
            <span>Student Performance Insight System</span>
            <span className="bottom-0 block h-1 rounded-xl w-28 bg-orange-500"></span>
          </div>
          <div
            className="darklightmode dark:bg-prussian-300 rounded-md dark:border-alabaster-100 border:bg-prussian-300 border-2 h-10 w-10 flex items-center justify-center"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <MdLightMode className="text-prussian-500 dark:text-alabaster-900 cursor-pointer text-2xl" />
            ) : (
              <MdDarkMode className="text-prussian-500 dark:text-alabaster-900 cursor-pointer text-2xl" />
            )}
          </div>
        </nav>
        <div className="hero-section px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-center text-pretty text-prussian-500 sm:text-7xl dark:text-alabaster-900">
                <span className="text-orange-500">Explainable AI</span> For
                Student Performance Prediction
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                An AI-powered system that predicts student exam performance and
                provides transparent explanations and improvement suggestions.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to={"/predict"}
                  className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-prussian-500 dark:text-alabaster-900 shadow-xs hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 dark:bg-orange-400 dark:hover:bg-orange-400 dark:focus-visible:outline-orange-500"
                >
                  Start Performance Analysis
                </Link>
                <Link
                  to={"#"}
                  className="text-sm/6 font-semibold text-prussian-500 dark:text-white"
                >
                  Learn How it Works <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="workflow">
          <div className="section1heading font-fredoka text-4xl text-pretty font-semibold text-center mb-8 mx-8">
            How does it work?
          </div>
          <div className="definingFlow flex flex-col items-center gap-3 mx-10 mb-8">
            {data.map((step) => (
              <Flowbox
                key={step.id}
                id={step.id}
                title={step.title}
                description={step.description}
                tags={step.tags}
              />
            ))}
          </div>
        </div>
        <div className="benefits/features mt-20 flex justify-center items-center flex-col gap-1">
          <div className="text-4xl font-fredoka text-pretty font-semibold text-center mb-8 mx-8">
            What are the Features?
          </div>
          <div className="features-section flex justify-center items-center gap-3 flex-wrap w-screen lg:max-w-7xl">
            {feature.map((item) => (
              <HoverCard
                id={item.id}
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className="articles_related_to_analysis">
          {/* <div>Here are some articles: </div>
          <div>
            <NewsCard

            />
          </div> */}
        </div>
        <footer
          className="
  mt-16
  border-t border-alabaster-300 dark:border-prussian-400
  py-6 px-4
  text-center
  text-sm
  text-black-700 dark:text-alabaster-700
  bg-transparent
"
        >
          <p className="font-semibold text-prussian-500 dark:text-alabaster-900">
            Explainable AI for Student Performance Prediction
          </p>

          <p className="mt-1">
            A college-level academic project focused on transparency in
            AI-driven performance analysis.
          </p>

          <p className="mt-2 text-xs">
            This system is intended strictly for educational and research
            purposes. Results should not be used as a sole basis for academic
            decisions.
          </p>

          <p className="mt-3 text-xs opacity-70">
            © {new Date().getFullYear()} Copyrwight
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
