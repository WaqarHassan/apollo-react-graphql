import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// GQ Query to fetch all the JOBS
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
  // Following state element will hold the original list of Jobs always
  let [jobs, setJobs] = useState([]);
  // Following state element will hold the Filtered list of Jobs.
  let [filtered, setFiltered] = useState([]);
  // Call GQ API using ueQuery Hook
  const { loading, data } = useQuery(JOBS);
  // Filter records as user starts typing in the input field.
  const onChange = e => {
    // Filter record by mathing job title or company name
    let j = jobs.filter(
      j =>
        j.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        j.company.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // set State to re-render the component
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
  // set state when API returns record the first time. will be called only once
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
          <div class="inbox-widget chart-content-bg mt-2">
            {filtered &&
              filtered.map(
                ({
                  id,
                  title,
                  isPublished,
                  description,
                  slug,
                  company,
                  applyUrl,
                  userEmail
                }) => (
                  <div class="inbox-item custom">
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
                    {userEmail && (
                      <p className="mt-2">
                        <strong>Posted By:</strong>{" "}
                        <a href={`mailto:${userEmail}`}> {userEmail}</a>
                      </p>
                    )}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
