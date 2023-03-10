const cds = require("@sap/cds");

function toPet(data) {
  return { id: data.id, name: data.name, status: data.status };
}

module.exports = async (srv) => {
  const remoteSrv = await cds.connect.to("Petstore");
  const { Pets } = srv.entities;

  srv.on("READ", Pets, async (req) => {
    const ref = req.query.SELECT.from.ref[0];
    if (typeof ref !== "string") {
      // By id
      const petId = ref.where[2].val;
      const pet = await remoteSrv.send("pet_", { petId });
      return toPet(pet);
    }

    // List
    const where = req.query.SELECT.where;
    if (
      where.length !== 3 ||
      where[0].ref[0] !== "status" ||
      where[1] !== "="
    ) {
      return req.reject(400, "Filter by pet status is required.");
    }

    const petStatus = where[2].val;
    const pets = await remoteSrv.send("pet_findByStatus", {
      status: [petStatus],
    });
    return pets.map(toPet);
  });

  srv.on("CREATE", Pets, async (req) => {
    const pet = await remoteSrv.send("pet_post", {
      body: {
        name: req.data.name,
        status: req.data.status ?? "available",
      },
    });
    return toPet(pet);
  });

  srv.on("UPDATE", Pets, async (req) => {
    let pet = await remoteSrv.send("pet_", { petId: req.data.id });
    pet = await remoteSrv.send("pet_put", {
      body: {
        id: req.data.id,
        name: req.data.name ?? pet.name,
        status: req.data.status ?? pet.status,
      },
    });
    return toPet(pet);
  });

  srv.on("DELETE", Pets, async (req) => {
    const petId = req.data.id;
    await remoteSrv.send("pet__delete", { petId });
  });
};
