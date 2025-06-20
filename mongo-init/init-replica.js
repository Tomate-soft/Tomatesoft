const { MongoClient } = require('mongodb');

async function initReplicaSet() {
  const client = new MongoClient('mongodb://database:27017');
  try {
    await client.connect();
    const adminDb = client.db('admin');
    const result = await adminDb.command({
      replSetInitiate: {
        _id: "rs0",
        members: [{ _id: 0, host: "database:27017" }]
      }
    });
    console.log('✅ Replica set initiated:', result);
  } catch (e) {
    if (e.codeName === 'AlreadyInitialized') {
      console.log('ℹ️ Replica set already initialized');
    } else {
      console.error('❌ Error initiating replica set:', e);
    }
  } finally {
    await client.close();
  }
}

initReplicaSet();


// rs.initiate({
//   _id: "rs0",
//   members: [{ _id: 0, host: "database:27017" }]
// });