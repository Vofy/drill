export default function handler(req, res) {
    const memeDir = __dirname + '/api/static/images/memes/';

    fs.readdir(memeDir, (err, files) => {
        var image = files[Math.floor(Math.random() * files.length)];

        res.status(200).json({
            image: {
                name: path.parse(image).name,
                path: "/images/memes/" + image 
            }
        });
    })
}  