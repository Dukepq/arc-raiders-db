import { mockArticles } from "@/app/mockData/mock-articles";
import ImageWithSpinner from "@/app/_components/ui/ImageWithSpinner";

export default function Page() {
  return (
    <div className="max-w-screen-lg mx-auto px-3">
      {mockArticles.map((article, index) => {
        return (
          <div
            key={index}
            className="flex my-6 gap-3 flex-col md:flex-row bg-backdrop rounded-sm bg-opacity-60 hover:bg-opacity-100 cursor-pointer transition-colors"
          >
            <div className="md:min-w-96 md:h-auto h-48">
              <div className="relative h-full">
                <ImageWithSpinner
                  loading="lazy"
                  src={article.image}
                  alt="image"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="flex flex-col p-3">
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="max-h-36 overflow-auto pr-6">{article.text}</p>
              <span className="inline-block mt-auto pt-3 font-bold cursor-pointer">
                Read more
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
