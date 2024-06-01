const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { level, boatName, captainName, phone, address, email, nationality, category, boatBrand, boatColor, boatSize, crew, kids } = req.body;

  let workbook;
  let worksheet;
  const filePath = 'registrations.xlsx';

  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');
  }

  const newRow = {
    Level: level,
    BoatName: boatName,
    CaptainName: captainName,
    Phone: phone,
    Address: address,
    Email: email,
    Nationality: nationality,
    Category: category,
    BoatBrand: boatBrand,
    BoatColor: boatColor,
    BoatSize: boatSize,
    Crew: JSON.stringify(crew),
    Kids: JSON.stringify(kids)
  };
  const data = xlsx.utils.sheet_to_json(worksheet);
  data.push(newRow);
  const newWorksheet = xlsx.utils.json_to_sheet(data);

  workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
  xlsx.writeFile(workbook, filePath);

  res.send('Registration successful!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
