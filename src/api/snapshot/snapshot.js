import snapshot from '@snapshot-labs/snapshot.js';

const hub = 'https://hub.snapshot.org/graphql'
// const proposal_id = "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj";
const space_id = "apecoin.eth"
const votes_sample_size = 100000

const snapshot_query_proposals = {
    proposals: {
        __args: {
            first: 1,
            skip: 0,
            where: {
                space_in: [space_id],
                state: "closed"
            },
            orderBy: "created"
        },
        id: true,
        snapshot: true,
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
    const proposal_data = await snapshot.utils.subgraphRequest(hub, snapshot_query_proposals);
    let proposal_id = proposal_data['proposals'][0]["id"]
    // console.log(proposal_id);

    const snapshot_query_vote = {
        votes: {
            __args: {
                first: votes_sample_size,
                skip: 0,
                where: {
                    proposal: proposal_id
                    // space: space_id
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

    const vote_data = await snapshot.utils.subgraphRequest(hub, snapshot_query_vote);
    // console.log(vote_data);

    var unique_proposal_ids = []
    vote_data["votes"].forEach(vote_detail => {
        let proposal_id = vote_detail["proposal"]["id"]
        if (unique_proposal_ids.hasOwnProperty(proposal_id)) {
            unique_proposal_ids[proposal_id].voters.push(vote_detail["voter"])
            // unique_proposal_ids[proposal_id].votes.push(vote_detail["id"])
        } else {
            var proposal_turnout = new Object();
            proposal_turnout.voters = [vote_detail["voter"]];
            // proposal_turnout.votes = [vote_detail["id"]];
            unique_proposal_ids[proposal_id] = proposal_turnout
        }
    });
    // console.log(unique_proposal_ids);

    let total_voter_turnout = 0;
    Object.keys(unique_proposal_ids).forEach(function (key) {
        console.log('Key : ' + key + ', Value : ' + unique_proposal_ids[key])
        unique_proposal_ids[key].unique_voter_count = unique_proposal_ids[key].voters.filter(onlyUnique).length
        total_voter_turnout += unique_proposal_ids[key].unique_voter_count
    })
    // console.log(unique_proposal_ids[proposal_id].unique_voter_count);
    console.log(total_voter_turnout);

    const space_data = await snapshot.utils.subgraphRequest(hub, snapshot_query_space);
    // console.log(space_data);

    // var member_ids = space_data["space"]["members"]

    let unique_member_count = 0;
    if (space_data["space"]["id"].includes('apecoin')) {
        unique_member_count = 7700
    } else if (space_data["space"]["id"].includes('ens')) {
        unique_member_count = 76000
    } else if (space_data["space"]["id"].includes('gitcoindao')) {
        unique_member_count = 63000
    }
    // console.log(unique_member_count);

    // let avg_turnout = total_voter_turnout / Object.keys(unique_proposal_ids).length  // avg turnout rate per proposal 

    var avg_turnout_rate_percent = total_voter_turnout / unique_member_count * 100

    var dao_stat = new Object();
    dao_stat.id = space_data["space"]["id"];
    dao_stat.name = space_data["space"]["name"];
    dao_stat.about = space_data["space"]["about"];
    // dao_stat.membership_size = unique_member_count;
    dao_stat.avg_turnout_rate_percent = avg_turnout_rate_percent;
    console.log(dao_stat);

    return JSON.stringify(dao_stat);
})();

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
