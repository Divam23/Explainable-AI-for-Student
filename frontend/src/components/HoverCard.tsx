import type { featuresData } from "@/utils/featuresData";

const HoverCard = ({ icon, title, description }: featuresData) => {
  return (
    <>
      <style>{`
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="flip-card w-80 h-48 lg:max-w-5xl perspective-1000 cursor-pointer group sm:min-w-[20rem]">
        <div className="flip-card-inner">
          {/* Front of card */}
          <div className="flip-card-front rounded-2xl bg-alabaster-500 shadow-lg flex flex-col items-center justify-center p-6 border-2 border-prussian-500/10 dark:border-alabaster-500 dark:bg-prussian-500">
            <div className="text-4xl mb-4 opacity-80">
              {icon}
            </div>
            <h3 className="text-prussian-500 dark:text-alabaster-500 font-fredoka font-semibold text-base text-center leading-tight">
              {title}
            </h3>
          </div>

          {/* Back of card */}
          <div className="flip-card-back rounded-2xl bg-prussian-500 dark:bg-alabaster-500 shadow-lg flex items-center justify-center p-6 border-2 border-prussian-400 dark:border-prussian-600">
            <p className="text-alabaster-500 dark:text-prussian-200 text-sm leading-relaxed text-center font-fredoka">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { HoverCard };