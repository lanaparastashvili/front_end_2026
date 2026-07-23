import React, { useMemo, useState } from "react";
export interface Job {
  id: number;
  company: string;
  logo?: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}
const jobs: Job[] = [
  {
    id: 1,
    company: "Photosnap",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Ruby"],
    tools: ["Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];

const LOGO_COLORS: string[] = [
  "#5ba29b", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f",
  "#0081a7", "#00afb9", "#f07167", "#6a994e", "#457b9d",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function jobTags(job: Job): string[] {
  return Array.from(new Set([job.role, job.level, ...job.languages, ...job.tools]));
}

interface TagButtonProps {
  tag: string;
  selected: boolean;
  onClick: (tag: string) => void;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, selected, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(tag)}
    className={`rounded px-3 py-1.5 text-sm font-bold transition-all ${
      selected
        ? "bg-teal-500 text-white"
        : "bg-teal-50 text-teal-500 hover:bg-teal-500 hover:text-white"
    }`}
  >
    {tag}
  </button>
);

interface FilterChipProps {
  tag: string;
  onRemove: (tag: string) => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ tag, onRemove }) => (
  <div className="flex items-stretch overflow-hidden rounded-md bg-teal-50 text-sm font-bold text-teal-500">
    <span className="flex items-center px-3 py-1.5">{tag}</span>
    <button
      type="button"
      onClick={() => onRemove(tag)}
      aria-label={`Remove ${tag} filter`}
      className="flex items-center justify-center bg-teal-500 px-2.5 text-white transition-colors hover:bg-teal-700"
    >
      ✕
    </button>
  </div>
);

interface JobCardProps {
  job: Job;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, selectedTags, onTagClick }) => {
  const tags = jobTags(job);
  const color = LOGO_COLORS[job.id % LOGO_COLORS.length];

  return (
    <div
      className={`relative flex flex-col gap-4 rounded-lg bg-white p-6 pt-11 shadow-[0_15px_25px_-10px_rgba(60,120,115,0.25)] sm:flex-row sm:items-center sm:gap-6 sm:pt-6 md:p-8 ${
        job.featured ? "border-l-4 border-teal-500" : "border-l-4 border-transparent"
      }`}
    >
      <div
        className="absolute -top-6 left-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white shadow-sm sm:static sm:h-16 sm:w-16 sm:text-xl"
        style={{ backgroundColor: color }}
      >
        {initials(job.company)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-teal-500">{job.company}</span>
          {job.new && (
            <span className="rounded-full bg-teal-500 px-2.5 py-1 text-xs font-bold uppercase text-white">
              New!
            </span>
          )}
          {job.featured && (
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold uppercase text-white">
              Featured
            </span>
          )}
        </div>

        <h3 className="mb-2 cursor-pointer text-lg font-bold text-slate-800 transition-colors hover:text-teal-500">
          {job.position}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-400">
          <span>{job.postedAt}</span>
          <span className="mb-1 text-lg leading-none">•</span>
          <span>{job.contract}</span>
          <span className="mb-1 text-lg leading-none">•</span>
          <span>{job.location}</span>
        </div>
      </div>

      <div className="hidden self-stretch sm:block sm:w-px sm:bg-slate-200" />

      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4 sm:max-w-[300px] sm:justify-end sm:border-t-0 sm:pt-0">
        {tags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            selected={selectedTags.includes(tag)}
            onClick={onTagClick}
          />
        ))}
      </div>
    </div>
  );
};

const JobListings: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev : [...prev, tag]
    );
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearAll = () => setSelectedTags([]);

  const filteredJobs = useMemo(() => {
    if (selectedTags.length === 0) return jobs;
    return jobs.filter((job) => {
      const tags = jobTags(job);
      return selectedTags.every((t) => tags.includes(t));
    });
  }, [selectedTags]);

  return (
    <div className="min-h-screen bg-[#effafa] font-sans">
      <div className="h-36 w-full bg-[#5ba4a4] bg-[url('/bg-header-desktop.svg')] bg-cover bg-center sm:h-40">
      </div>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {selectedTags.length > 0 && (
          <div className="relative z-10 -mt-9 mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-5 shadow-[0_15px_25px_-10px_rgba(60,120,115,0.25)] sm:p-6">
            <div className="flex flex-1 flex-wrap gap-4">
              {selectedTags.map((tag) => (
                <FilterChip key={tag} tag={tag} onRemove={removeTag} />
              ))}
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-bold text-slate-500 transition-colors hover:text-teal-500 hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        <div className={`flex flex-col gap-6 ${selectedTags.length === 0 ? "mt-12" : "mt-8"}`}>
          {filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <p className="mb-4 text-lg">No positions match the selected filters.</p>
              <button
                type="button"
                onClick={clearAll}
                className="mx-auto block rounded-md bg-teal-500 px-6 py-2.5 font-bold text-white transition-colors hover:bg-teal-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                selectedTags={selectedTags}
                onTagClick={toggleTag}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default JobListings;
