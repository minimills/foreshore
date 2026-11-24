import Link from "next/link";
import WorkShowcase from "./WorkShowcase";
import { getProjects, getWork } from "@/lib/content";

export default function Work() {
  const work = getWork();
  return (
    <section id="work" className="work pad">
      <div className="work-head" data-reveal="">
        <h2>{work.heading}</h2>
        <Link className="more" href="/work">
          {work.allWorkLink} →
        </Link>
      </div>
      <WorkShowcase projects={getProjects()} work={work} />
      <p className="muted note" data-reveal="">
        {work.note}
      </p>
    </section>
  );
}
