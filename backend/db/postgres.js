// Example: backend/db/postgres.js
const pool = new Pool({ connectionString: process.env.PG_URI });

async function getRawPublicationData(doi) {
    const query = 'SELECT title, abstract, full_text FROM publications WHERE doi = $1;';
    const result = await pool.query(query, [doi]);
    return result.rows[0];
}