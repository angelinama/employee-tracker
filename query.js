class Query {
  constructor(params) {
    this.params = params;
  }

  // findSongByArtist(artist) {
  //   console.log('Selecting songs by artist...\n');
  //   connection.query(`SELECT * FROM TOP5000 WHERE artist="${artist}"`, (err, res) => {
  //     if (err) throw err;
  //     console.table(res);
  //     connection.end();
  //   });
  // };
getAllEmployee() {
  const query = 'SELECT * FROM EMPLOYEE';
}
}

module.exports = Query;