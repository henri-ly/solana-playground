import axios from "axios"

async function validateSignature() {
    const startTime = Date.now();

    const config = {
        params: {
            signature: '4RNsBz6Mf4EJPu61BSiJUJWdnsJ4uSMcjtd5PVUgPF3XXQWwDnJZVuifRdTz8Zq6wVy1yRTDG15zhD2G6vp8UKWc', 
        }
    };

    try {
        const response = await axios.get('http://localhost:8003/validateSignature', config);

        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        console.log(response)
        console.log(`Time Taken: ${timeTaken} ms`);
    } catch (error) {
        console.error(error);
    }
}
validateSignature();