const Customer = require('../model/customer');
const { validationResult } = require('express-validator');
const e = require('express');

// Add new customer
exports.addNewCustomer = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const reports = req.body.reports;  
  const createdAt = req.body.createdAt; 

  const customer = new Customer({
    name: name,
    phone: phone,
    reports: reports, 
    createdAt: createdAt,
  }); 
  customer.save()
    .then(result => {
      return res.status(200).send({ error: "false", message: `Customer was successfully added`, data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
    });
}

// Fetch all customers
exports.fetchCustomers = async (req, res, next) => {
  try {
    const customer = await Customer.find();
    return res.status(200).send({ error: "false", message: "Customers successfully fetched", data: customer });
  } catch (error) {
    console.log(err);
    return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
  }

}

// Fetch a particular customer
exports.findCustomer = (req, res, next) => {
  const customerId = req.params.id;
  Customer.findById(customerId)
    .then(customer => {
      if (!customer) {
        return res.status(422).send({ error: "true", message: "Couldn't find the customer with the id specified" });
      }
      return res.status(200).send({ error: "false", message: "Customer successfully fetched", data: customer });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch customer` });
    });
}

// Add new customer report / sales
exports.addNewCustomerReport = (req, res, next) => {
  const customerId = req.params.id; 
  const newReports = req.body;   

  //const totalAmount = req.body.totalAmount;
  //const paymentMade = req.body.paymentMade;
  //const paid = req.body.paid;
  //const soldAt = req.body.soldAt; 
  //const dueDate;
  //const paymentReceivedAt;
  //if(paid === true){
  //  dueDate = req.body.dueDate;
  //} else { 
  //  paymentReceivedAt = soldAt;
  //}
  console.log(newReports);


  Customer.findById(customerId)
    .then(customer => {
      if (!customer) {
        return res.status(422).send({ error: "true", message: "Couldn't find the customer with the id specified" });
      } 
      Customer.findByIdAndUpdate(customerId, { $push: { reports: newReports } },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Adding reports to customer failed." });
          } else {
            console.log(result);
            return res.status(200).send({ error: "false", message: `Reports updated successfully for ${customer.name}` });
          }
        }
      ); 
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch customer` });
    }); 
}

// Update a particular report details of a customer
exports.updateCustomerReport = (req, res, next) => {
  const customerId = req.body.id; 
  const reportId = req.body.reportId;  
  const report = req.body.report; 
  const totalAmount = req.body.totalAmount;
  const paymentMade = req.body.paymentMade;  

  Customer.findById(customerId)
    .then(customer => {
      if (!customer) {
        return res.status(422).send({ error: "true", message: "Couldn't find the customer with the id specified" });
      } 
      Customer.findOneAndUpdate({'reports._id': reportId}, { $set: { 
        'reports.$.report': report,
        'reports.$.totalAmount': totalAmount,
        'reports.$.paymentMade': paymentMade 
      } },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Updating payment to report failed." });
          } else {
            return res.status(200).send({ error: "false", message: `Report updated successfully for ${customer.name}` });
          }
        }
      );  
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch customer` });
    });  
}

// Update a particular report payment made of a customer
exports.updatePaymentMadeReport = (req, res, next) => {
  const customerId = req.body.id; 
  const reportId = req.body.reportId;  
  const payment = req.body.payment;

  Customer.findById(customerId)
    .then(customer => {
      if (!customer) {
        return res.status(422).send({ error: "true", message: "Couldn't find the customer with the id specified" });
      } 
      Customer.findOneAndUpdate({'reports._id': reportId}, { $set: { 'reports.$.paymentMade': payment } },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Updating payment to report failed." });
          } else {
            return res.status(200).send({ error: "false", message: `Payment updated successfully for ${customer.name}` });
          }
        }
      );  
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch customer` });
    });  
}

// Settle a particular report payment made of a customer
exports.settlePaymentReport = (req, res, next) => {
  const customerId = req.body.id; 
  const reportId = req.body.reportId;  
  const payment = req.body.payment;
  const paymentReceivedAt = req.body.paymentReceivedAt; 

  Customer.findById(customerId)
    .then(customer => { 
      if(!customer){ 
        return res.status(422).send({ error: "true", message: "Couldn't find the customer with the id specified" });
      }
      Customer.findOneAndUpdate({'reports._id': reportId}, { $set: {
         'reports.$.paymentMade': payment, 
         'reports.$.paid': true,
         'reports.$.paymentReceivedAt': paymentReceivedAt
        } },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "true", message: "Updating payment to report failed." });
          } else {
            return res.status(200).send({ error: "false", message: `Payment settled successfully for ${customer.name}` });
          }
        }
      );  
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: `Unable to fetch customer` });
    });  
} 
 
// Delete a customer 
exports.deleteCustomer = (req, res, next) => {
  const customerId = req.params.id;  

  Customer.findById(customerId, )
    .then(customer => {
      if (!customer) {
        return res.status(422).send({ error: "true", message: "Couldn't find the customer with the id specified" });
      }
      return Customer.deleteOne({ _id: customerId });
    })
    .then(() => { 
      return res.status(200).send({ error: "false", message: `Deleted customer successfully` });
    })
    .catch(err => { 
      return res.status(500).send({ error: "true", message: "Deleting customer failed." });
    });
  
} 