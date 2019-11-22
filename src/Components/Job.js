import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const JOBS = gql`
  {
    jobs {
      id
      title
      isPublished
      description
      slug
      company {
        name
        slug
      }
      userEmail
      applyUrl
    }
  }
`;

export default function Job() {
  let [jobs, setJobs] = useState([]);
  let [filtered, setFiltered] = useState([]);
  const { loading, data } = useQuery(JOBS);
  const onChange = e => {
    let j = jobs.filter(
      j =>
        j.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        j.company.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log("j Length - ", j.length);
    setFiltered(j);
  };
  if (loading)
    return (
      <div class="form-group">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Jobs</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Job or Company"
              onChange={onChange}
            />
            <div class="inbox-widget jumbotron mt-2">
              <h3>Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  if (!jobs.length && data && data.jobs.length) {
    setJobs(data.jobs);
    setFiltered(data.jobs);
  }

  return (
    <div class="form-group">
      <div class="card">
        <div class="card-body">
          <h4 class="header-title mb-3">Jobs</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Job or Company"
            onChange={onChange}
          />
          <div class="inbox-widget jumbotron mt-2">
            {filtered &&
              filtered.map(
                ({
                  id,
                  title,
                  isPublished,
                  description,
                  slug,
                  company,
                  applyUrl
                }) => (
                  <div class="inbox-item">
                    <div class="inbox-item-img"></div>
                    <div class="custom-control custom-checkbox mb-2">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id={id}
                        checked={isPublished}
                      />
                      <label
                        class="custom-control-label"
                        for={id}
                        title="Published"
                      ></label>
                      {company && (
                        <a
                          href={`/jobs/${slug}/${company.slug}`}
                          class="btn btn-sm text-info font-18"
                        >
                          {title}
                        </a>
                      )}
                      <small>at </small>{" "}
                      <b className="text-danger font-16">{company.name}</b>
                    </div>
                    <p class="inbox-item-text description">{description}</p>
                    <p class="inbox-item-date">
                      <a
                        href={applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-primary font-13"
                      >
                        Apply
                      </a>
                      {company && (
                        <a
                          href={`/jobs/${slug}/${company.slug}`}
                          class="btn btn-sm btn-link text-info font-13"
                        >
                          View Details
                        </a>
                      )}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
