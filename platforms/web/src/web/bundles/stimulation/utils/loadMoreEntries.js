const loadMoreEntries = (data, isFetching, handleFetch, query) => {
  const { fetchMore } = data;

  if (!isFetching) {
    handleFetch(true);
    return fetchMore({
      query,
      variables: {
        cursor: data.viewer.allActivities.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const {
          edges: newEdges,
          pageInfo,
        } = fetchMoreResult.viewer.allActivities;

        return {
          viewer: {
            __typename: 'Viewer',
            allActivities: {
              __typename: 'ActivityConnection',
              edges: [
                ...previousResult.viewer.allActivities.edges,
                ...newEdges,
              ],
              pageInfo,
            },
          },
        };
      },
    }).then(() => handleFetch(false));
  }
  return null;
};

export default loadMoreEntries;
