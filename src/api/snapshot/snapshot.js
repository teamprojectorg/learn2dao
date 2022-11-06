import snapshot from '@snapshot-labs/snapshot.js';

const hub = 'https://hub.snapshot.org/graphql'
// const proposal_id = "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj";
const space_id = "spookyswap.eth"
const votes_sample_size = 10000

const snapshot_query_vote = {
    votes: {
        __args: {
            first: votes_sample_size,
            skip: 0,
            where: {
                // proposal: proposal_id
                space: space_id
            }
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
        }
    }
};

const snapshot_query_space = {
    space: {
        __args: {
            id: space_id,
        },
        id: true,
        name: true,
        about: true,
        network: true,
        symbol: true,
        members: true
    }
};

(async function x() {
    const vote_data = await snapshot.utils.subgraphRequest(hub, snapshot_query_vote);
    // console.log(space_data);

    var vote_ids = []
    vote_data["votes"].forEach(vote_detail => {
        vote_ids.push(vote_detail["id"]);
    });

    var voter_ids = []
    vote_data["votes"].forEach(vote_detail => {
        voter_ids.push(vote_detail["voter"]);
    });

    var unique_vote_count = vote_ids.filter(onlyUnique).length;
    var unique_voter_count = vote_ids.filter(onlyUnique).length;

    console.log(unique_vote_count);
    console.log(unique_voter_count);

    const space_data = await snapshot.utils.subgraphRequest(hub, snapshot_query_space);
    // console.log(space_data);

    var member_ids = space_data["space"]["members"]
    var unique_member_count = member_ids.filter(onlyUnique).length;
    console.log(unique_member_count);

    var avg_turnout_rate_percent = unique_member_count / unique_voter_count * 100

    var dao_stat = new Object();
    dao_stat.id = space_data["space"]["id"];
    dao_stat.name = space_data["space"]["name"];
    dao_stat.about = space_data["space"]["about"];
    dao_stat.avg_turnout_rate_percent = avg_turnout_rate_percent;
    console.log(dao_stat);

    return JSON.stringify(dao_stat);
})();

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
