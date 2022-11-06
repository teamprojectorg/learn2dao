import snapshot from '@snapshot-labs/snapshot.js';

const hub = 'https://hub.snapshot.org/graphql'
const proposal_id = "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj";
const votes_sample_size = 1000

const snapshot_query = {
    votes: {
        __args: {
            first: votes_sample_size,
            skip: 0,
            where: {
                proposal: proposal_id
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

(async function x() {
    const votes = await snapshot.utils.subgraphRequest(hub, snapshot_query);

    // let total = 0;
    // votes["data"].forEach(t => {
    //     const s = sentiment(t["text"]);
    //     total = total + s["score"];
    // });

    console.log(votes);
})();
