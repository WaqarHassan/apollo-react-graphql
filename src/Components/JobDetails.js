import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router";

// Call Graphql API to fetch record matching company and job Slug properties requried by API
const GET_JOB = gql`
  query getJob($companySlug: String!, $jobSlug: String!) {
    job(input: { companySlug: $companySlug, jobSlug: $jobSlug }) {
      id
      title
      isPublished
      description
      company {
        name
      }
      userEmail
      applyUrl
    }
  }
`;

export default function JobDetails(props) {
  // usePrams is used to read params and then call the API to fetch details
  const { job_slug, company_slug } = useParams();
  let [job, setJob] = useState({});
  // useQuery is apollo Hook to call GQ API
  const { loading, data } = useQuery(GET_JOB, {
    variables: {
      jobSlug: job_slug,
      companySlug: company_slug
    }
  });

  // setState when first api call is made. very important to mange state in hooks
  if (!Object.keys(job).length && data && data.job) {
    setJob(data.job);
  }
  // Show user that data is being fetched from the backend.
  if (loading) {
    return (
      <div class="form-group">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Job Details </h4>
            <div class="inbox-widget mt-2">
              <h3>Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Destructuring the the state element
  const { id, title, isPublished, description, company, applyUrl } = job;
  return (
    <div class="form-group">
      <div class="card">
        <div class="card-body">
          <h4 class="header-title mb-3">Job Details</h4>
          <div class="inbox-widget mt-2">
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
                <a
                  href="javascript:void(0)"
                  class="btn btn-sm text-info font-18"
                >
                  {title}
                </a>
                <small>at </small>{" "}
                {company && (
                  <b className="text-danger font-16">{company.name}</b>
                )}
              </div>
              <p class="detailed-description">{description}</p>
              <p class="inbox-item-date">
                <a
                  href={applyUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  class="btn btn-sm btn-primary font-13"
                >
                  Apply
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
