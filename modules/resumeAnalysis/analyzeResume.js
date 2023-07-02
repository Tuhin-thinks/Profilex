const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

OPENAI_COMPLETION_ENDPOINT = 'https://api.openai.com/v1/completions';

/**
 * Analyzes the resume and returns the basic suggestions/feedback as generated from chat gpt
 * @param {String} resumeTextContent - The text content of the resume
 * @returns {Array} - Array of suggestions/feedbacks
 */
const analyzeResume = async (resumeTextContent) => {
    const promptText = `Analyze my resume section wise and suggest atleast 10 Feedbacks. Also provide detailed examples for each of the feedbacks.
And send me each feedback in a newline so that I can split them.
My resume content is as follows:\n${resumeTextContent}\n
And send me each feedback newline separated, so that I can split them and show them in a list.`;

    const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: promptText,
        max_tokens: 700,
        temperature: 0.5,
    });

    try {
        if (data.choices.length > 0) {
            const rawText = data.choices[0].text;
            const suggestionsArray = rawText
                .trim()
                .split('\n')
                .filter((suggestion) => suggestion.length > 0);
            return suggestionsArray;
        }
    } catch (err) {
        console.log(err);
    }
    return [];
};

module.exports = {
    analyzeResume,
};
