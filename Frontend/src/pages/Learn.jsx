import { Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading.jsx";
import { learnArticles } from "../data/siteData.js";

function Learn() {
  return (
    <section className="page-wrap py-14">
      <SectionHeading
        eyebrow="Learn"
        title="Beginner guides and practical crypto education"
        description="Follow a content layout inspired by Coinbase Learn with foundational topics and actionable tips."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learnArticles.map((article) => (
          <article key={article.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{article.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{article.description}</p>
              <Link to={article.to} className="mt-4 inline-block text-sm font-bold text-blue-700 hover:text-blue-900">
                Continue reading →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Learn;
