const cds = require("@sap/cds");

function toPet(data) {
  return { id: data.id, name: data.name, status: data.status };
}

module.exports = async (srv) => {
  const { Pets } = srv.entities;

  srv.on("READ", Pets, async (req) => {
    const remoteSrv = await cds.connect.to("Petstore");
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
};
