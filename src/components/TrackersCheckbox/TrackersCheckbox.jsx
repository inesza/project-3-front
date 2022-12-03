import React from "react";

const TrackersCheckbox = ({
  trackersCategory,
  trackersSubCategory,
  trackers,
  handleTrack,
  setTrackersCategory,
  setTrackersSubCategory,
  setTrackers,
}) => {
  return (
    <div>
      <h2>Trackers Category</h2>
      <ul>
        {trackersCategory.map((trackerCategory) => {
          return (
            <div key={trackerCategory._id}>
              <h2>
                {" "}
                <label htmlFor={trackerCategory.name}>
                  {trackerCategory.name}
                </label>
                <input
                  type="checkbox"
                  id={trackerCategory.name}
                  name={trackerCategory.name}
                  value={trackerCategory.name}
                  onChange={() =>
                    handleTrack(
                      trackerCategory._id,
                      setTrackersCategory,
                      trackersCategory
                    )
                  }
                  checked={trackerCategory.status}
                />
              </h2>

              {trackerCategory.status &&
                trackersSubCategory
                  .filter(
                    (trackerSubCategory) =>
                      trackerSubCategory.category === trackerCategory._id
                  )
                  .map((trackerSubCategory) => {
                    return (
                      <div key={trackerSubCategory._id}>
                        <div>
                          <h3>
                            <label htmlFor={trackerSubCategory.name}>
                              {trackerSubCategory.name}
                            </label>
                            <input
                              type="checkbox"
                              id={trackerSubCategory.name}
                              name={trackerSubCategory.name}
                              value={trackerSubCategory.name}
                              checked={trackerSubCategory.status}
                              onChange={() =>
                                handleTrack(
                                  trackerSubCategory._id,
                                  setTrackersSubCategory,
                                  trackersSubCategory
                                )
                              }
                            />
                          </h3>
                        </div>
                        {trackerSubCategory.status &&
                          trackers
                            .filter(
                              (tracker) =>
                                tracker.subcategory === trackerSubCategory._id
                            )
                            .map((tracker) => {
                              return (
                                <div
                                  key={tracker._id}
                                  className="tracker-checkbox"
                                >
                                  <label htmlFor={tracker.name}>
                                    <input
                                      type="checkbox"
                                      id={tracker.name}
                                      name={tracker.name}
                                      value={tracker.name}
                                      checked={tracker.status}
                                      onChange={() =>
                                        handleTrack(
                                          tracker._id,
                                          setTrackers,
                                          trackers
                                        )
                                      }
                                    />
                                    <span>{tracker.name}</span>
                                  </label>
                                </div>
                              );
                            })}
                      </div>
                    );
                  })}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TrackersCheckbox;
