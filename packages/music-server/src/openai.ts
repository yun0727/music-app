import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getMusicRecommendations = async (tags: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
          Suggest five pieces of music based on the following preferences: ${tags}.
          and make path to this : 'www.naver.com'
          Provide the result in the following format:
        [
          {, "title":"Song Title", },  
        ]
          `,
        },
      ],
    });
    const result = response.choices[0].message.content ?? "";
    const recommendations = JSON.parse(result);
    return recommendations;
  } catch (error) {
    console.error(error);
    return [];
  }
};
