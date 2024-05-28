module.exports = {
  createInvitationEmailTemplate: (eventLink) => `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            text-align: center;
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
            line-height: 1.5;
          }
          a {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          a:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invitation to Event</h1>
          <p>You have been invited to join an event game!</p>
          <p>Click the link below to join:</p>
          <a href="${eventLink}">Join Event</a>
        </div>
      </body>
    </html>
  `,

  createConsultationEmailTemplate: (response, remarks, consultationId, consultationDetails) => {
    const details = `
      <div class="details">
        <p><strong>Consultation ID:</strong> ${consultationId}</p>
        <p><strong>Professor:</strong> ${consultationDetails.professor_1}</p>
        <p><strong>Category:</strong> ${consultationDetails.category_1}</p>
        <p><strong>Subcategory:</strong> ${consultationDetails.subcategory_1}</p>
        <p><strong>Remarks:</strong> ${consultationDetails.remarks_1}</p>
      </div>
    `;

    const baseTemplate = (header, message) => `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              margin: 50px auto;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
            }
            h1 {
              color: #333333;
              text-align: center;
            }
            p {
              color: #666666;
              line-height: 1.5;
            }
            .message {
              margin-top: 20px;
              text-align: center;
            }
            .details {
              background-color: #f9f9f9;
              padding: 15px;
              margin-top: 20px;
              border-radius: 8px;
              box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
            }
            .details p {
              margin: 5px 0;
            }
            .remarks {
              margin-top: 20px;
              font-style: italic;
              color: #555555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${header}</h1>
            <div class="message">
              ${message}
              ${details}
              ${remarks ? `<p class="remarks"><strong>Additional Remarks:</strong> ${remarks}</p>` : ""}
            </div>
          </div>
        </body>
      </html>
    `;

    if (response === "accept") {
      return baseTemplate(
        "Approved Consultation Request",
        `<p>Your consultation with Engr. <strong>${consultationDetails.professor_1}</strong> has been approved. Please proceed to the faculty office.</p>`
      );
    } else if (response === "decline") {
      return baseTemplate(
        "Declined Consultation Request",
        `<p>Your consultation with Engr. <strong>${consultationDetails.professor_1}</strong> has been declined.</p>${remarks ? `<p>Due to: ${remarks}</p>` : ""}`
      );
    } else {
      return "";
    }
  },

  createTerminationEmailTemplate: (response, remark) => {
    return `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Consultation Termination</title>
          <style>
              /* Your email styles here */
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333333;
              }
              p {
                  color: #666666;
                  margin-bottom: 10px;
              }
              .remarks {
                  color: #ff0000;
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Consultation Termination</h1>
              <p>Dear Student,</p>
              <p>We regret to inform you that your consultation with Professor <strong>{professorName}</strong> has been terminated.</p>
              <p>Due to:</p>
              <p class="remarks">${remark}</p>
          </div>
      </body>
      </html>`;
  }
};
