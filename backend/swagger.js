import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json'; // Where Swagger JSON will be saved
const endpointsFiles = ['./routes/common.js']; // Your main server/routes files

const doc = {
  info: {
    title: 'Employee Management API',
    description: 'Automatically generated Swagger doc',
  },
  host: 'verto-hackathon.vercel.app',
  schemes: ['https']
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
