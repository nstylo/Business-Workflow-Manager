import React, { useState, useEffect } from 'react';
import { get } from '../../../utils/baseRequests';
import { parseDateTime, parseFileName } from '../../../utils/helpers';

export default props => {
  // TODO: parse state
  const [details, setDetails] = useState(null); // job details

  // fetch job details on mount and set state
  useEffect(() => {
    const getDetails = async () => {
      get(`/jobs/${props.match.params.job_id}`)
        .then(response => setDetails(response.data))
        .catch(error => null); // TODO: handle error
    };

    getDetails();
  }, [props.match.params.job_id]); // if job_id changes, useEffect will get called again

  if (details) {
    return (
      <div className="details-pane">
        <div className="submit-details">
          <h3>{details.name}</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '25% auto',
              gridGap: '0.8em'
            }}
          >
            <h4>created on:</h4>
            <h4>{parseDateTime(details.created)}</h4>
            <h4>uploaded file:</h4>
            <h4>
              <a href={details.project} download>
                {parseFileName(details.project)}
              </a>
            </h4>
          </div>
        </div>
      </div>
    );
  } else {
    // TODO: load layout, but place dummies for unloaded data
    return <div>loading ...</div>;
  }
};
