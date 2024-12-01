const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const getAllResources = async () => {
  const keys = await redis.keys("*");
  const resources = [];
  for (const key of keys) {
    const value = await redis.get(key);
    resources.push({ key, value: JSON.parse(value) });
  }
  return resources;
};

const getResourceById = async (id) => {
  const resource = await redis.get(id);
  return resource ? JSON.parse(resource) : null;
};

const createResource = async (id, resource) => {
  await redis.set(id, JSON.stringify(resource));
};

const updateResource = async (id, resource) => {
  await redis.set(id, JSON.stringify(resource));
};

const deleteResource = async (id) => {
  await redis.del(id);
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
