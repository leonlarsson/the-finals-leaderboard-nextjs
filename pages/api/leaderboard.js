export default async (_, res) => {
    try {
        const dataResponse = await fetch("https://embark-discovery-leaderboard.storage.googleapis.com/leaderboard.json");

        if (dataResponse.ok) {
            const json = await dataResponse.json();
            const users = json.map(user => ({
                key: `${user.c}-${user.name}`,
                rank: user.r,
                change: user.or - user.r,
                name: user.name,
                xp: user.x,
                level: user.mx,
                cashouts: user.c,
                fame: user.f
            }));
            res.status(dataResponse.status).json(users);
        } else {
            res.status(dataResponse.status).end();
        }

    } catch (error) {
        res.status(500).end();
    }
}