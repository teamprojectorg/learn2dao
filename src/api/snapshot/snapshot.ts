import snapshot from "@snapshot-labs/snapshot.js";

const hub = "https://hub.snapshot.org/graphql";
// const proposal_id = "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj";
// const space_id = "spookyswap.eth";
const votes_sample_size = 10000;

export type SnapResult = {
  id: string;
  name: string;
  about: string;
  avgTurnoutRatePercent: number;
};

const getSnapshotQueryVote = (space_id: string) => ({
  votes: {
    __args: {
      first: votes_sample_size,
      skip: 0,
      where: {
        // proposal: proposal_id
        space: space_id,
      },
    },
    id: true,
    voter: true,
    vp: true,
    vp_by_strategy: true,
    vp_state: true,
    created: true,
    proposal: {
      id: true,
    },
    choice: true,
    space: {
      id: true,
    },
  },
});

const getSnapshotQuerySpace = (space_id: string) => ({
  space: {
    __args: {
      id: space_id,
    },
    id: true,
    name: true,
    about: true,
    network: true,
    symbol: true,
    members: true,
  },
});

export async function getSnapshot(spaceId: string = "apecoin.eth") {
  const vote_data = await snapshot.utils.subgraphRequest(
    hub,
    getSnapshotQueryVote(spaceId)
  );

  var vote_ids: string[] = [];
  vote_data["votes"].forEach((vote_detail: any) => {
    vote_ids.push(vote_detail["id"]);
  });

  var voter_ids = [];
  vote_data["votes"].forEach((vote_detail: any) => {
    voter_ids.push(vote_detail["voter"]);
  });

  var unique_vote_count = vote_ids.filter(onlyUnique).length;
  var unique_voter_count = vote_ids.filter(onlyUnique).length;

  console.log(unique_vote_count);
  console.log(unique_voter_count);

  const space_data = await snapshot.utils.subgraphRequest(
    hub,
    getSnapshotQuerySpace(spaceId)
  );

  var member_ids = space_data["space"]["members"];
  var unique_member_count = member_ids.filter(onlyUnique).length;
  console.log(unique_member_count);

  var avg_turnout_rate_percent =
    (unique_member_count / unique_voter_count) * 100;

  const dao_stat: SnapResult = {
    id: space_data["space"]["id"],
    name: space_data["space"]["name"],
    about: space_data["space"]["about"],
    avgTurnoutRatePercent: avg_turnout_rate_percent,
  };

  console.log(dao_stat);
  return dao_stat;
}

function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}
