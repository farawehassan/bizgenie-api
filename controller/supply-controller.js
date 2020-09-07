const Supply = require('../model/supply');
const { validationResult } = require('express-validator');

// Add new supply details
exports.addNewNormalSupply = (req, res, next) => {
  const dealer = req.body.dealer;
  const amount = req.body.amount; 
  const foc = req.body.foc;   
  const notes = req.body.notes;
  const received = req.body.received;
  const createdAt = req.body.createdAt;

  const normalSupply = new Supply({
    dealer: dealer,
    amount: amount, 
    foc: foc,
    notes: notes,
    received: received,
    createdAt: createdAt,
  }); 
  normalSupply.save()
  .then(result => {
    return res.status(200).send({ error: "false", message: `Supply was successfully added` });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  });   
}

exports.addNewFOCSupply = (req, res, next) => {
  const dealer = req.body.dealer;
  const amount = req.body.amount; 
  const foc = req.body.foc;   
  const focRate = req.body.focRate; 
  const focPayment = req.body.focPayment;
  const notes = req.body.notes;
  const received = req.body.received;
  const createdAt = req.body.createdAt;

  const focSupply = new Supply({
    dealer: dealer,
    amount: amount, 
    foc: foc,
    focRate: focRate,
    focPayment: focPayment,
    notes: notes,
    received: received,
    createdAt: createdAt,
  });
  focSupply.save()
  .then(result => {
    return res.status(200).send({ error: "false", message: `Supply was successfully added` });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  });
  
}

// Fetch all supply details
exports.fetchSupplies = async (req, res, next) => {
  try {
    const supplies = await Supply.find();
    return res.status(200).send({ error: "false", message: "Supplies successfully fetched", data: supplies });
  } catch (error) {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  }

}

// Fetch a particular supply details
exports.findSupply = (req, res, next) => {
  const supplyId = req.params.id;
  Supply.findById(supplyId)
    .then(supply => {
      if (!supply) {
        return res.status(422).send({ error: "true", message: "Couldn't find the supply with the id specified" });
      }
      return res.status(200).send({ error: "false", message: "Supply successfully fetched", data: supply });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch supply` });
    });
}

// Modify supply to change its details
exports.updateSupply = (req, res, next) => {
  const supplyId = req.body.id;
  const dealer = req.body.dealer;
  const amount = req.body.amount; 
  const notes = req.body.notes;
  const received = req.body.received;

  Supply.findById(supplyId)
    .then(supply => {
      if (!supply) {
        return res.status(422).send({ error: "true", message: "Couldn't find the supply with the id specified" });
      }
      Supply.findByIdAndUpdate(supplyId, {
        $set: {
          dealer: dealer,
          amount: amount, 
          notes: notes,
          received: received,
        }
      },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Updating supply failed." });
          } else {
            return res.status(200).send({ error: "false", message: `Supply updated successfully` });
          }
        }
      );

    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Database operation failed, please try again` });
    });

}

// Updates the supply by setting received to true
exports.receivedSupply = (req, res, next) => {
  const supplyId = req.body.id;
  const received = req.body.received;
  const receivedAt = req.body.receivedAt;

  Supply.findById(supplyId)
    .then(supply => {
      if (!supply) {
        return res.status(422).send({ error: "true", message: "Couldn't find the supply with the id specified" });
      }
      Supply.findByIdAndUpdate({ _id: supplyId }, { received: received, receivedAt: receivedAt },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Updating supply failed." });
          } else {
            return res.status(200).send({ error: "false", message: `Received supply set to true` });
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Database operation failed, please try again` });
    });

}

// Delete supply
exports.deleteSupply = (req, res, next) => {
  const supplyId = req.params.id; 
  Supply.findById(supplyId)
    .then(supply => {
      if (!supply) {
        return res.status(422).send({ error: "true", message: "Couldn't find the supply with the id specified" });
      } 
      return Supply.deleteOne({ _id: supplyId });
    })
    .then(() => {
      return res.status(200).send({ error: "false", message: `Deleted supply successfully` });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Deleting supply failed." });
    });
}