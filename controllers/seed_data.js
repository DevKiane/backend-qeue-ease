const AdminAccounts = require("../models/AdminAccounts");
const StudentAccount = require("../models/StudentAccounts");


exports.seedAdmin = () => {
    AdminAccounts.findAll()
      .then(existingData => {
        if (existingData.length === 0) {
          const initialData = [
            { name: 'Anthony Hernandez', email_address: "anthony.hernandez@g.batstate-u.edu.ph", password: '123' },
            { name: 'Laila Contreras', email_address: "laila.contreras@g.batstate-u.edu.ph", password: '123' },
            { name: 'Mark John Fel Rayos', email_address: "markjohnfel.rayos@g.batstate-u.edu.ph", password: '123' },
            { name: 'Jeffrey Sarmiento', email_address: "jeffrey.sarmiento@g.batstate-u.edu.ph", password: '123'},
            { name: 'Helcy Alon', email_address: "helcy.alon@g.batstate-u.edu.ph", password: '123'},
            { name: 'Jen Aldwayne Delmo', email_address: "jenaldwayne.delmo@g.batstate-u.edu.ph", password: '123'},
            { name: 'Mark Rondol P. Abdon', email_address: "markrondol.abdon@g.batstate-u.edu.ph", password: '123'},
            { name: 'Renz Reniel Serrano', email_address: "renzreniel.serrano@g.batstate-u.edu.ph", password: '123'},
            { name: 'Anacieto Mercado', email_address: "anacieto.mercado@g.batstate-u.edu.ph", password: '123'},
            { name: 'Jennifer Marasigan', email_address: "jennifer.marasigan@g.batstate-u.edu.ph", password: '123'}
          ];
          return AdminAccounts.bulkCreate(initialData);
        }
      })
      .then(() => {
        console.log('Admin data seeded successfully.');
      })
      .catch(error => {
        console.error('Error seeding admin data:', error);
      });
  };

  exports.seedStudent = () => {
    StudentAccount.findAll()
      .then(existingData => {
        if (existingData.length === 0) {
          const initialData = [
            { name: 'ABDON, Glecy H.', sr_code: "20-03569", password: '123', email_address: "20-03569@g.batstate-u.edu.ph" },
            { name: 'AGUILLERA, Bryan Angelo B.', sr_code: "20-07499", password: '123', email_address: "20-07499@g.batstate-u.edu.ph" },
            { name: 'ANDAL, Niña Rica L.', sr_code: "20-04155", password: '123', email_address: "20-04155@g.batstate-u.edu.ph" },
            { name: 'ARGUELLES, Leonard S.', sr_code: "20-08113", password: '123', email_address: "20-08113@g.batstate-u.edu.ph" },
            { name: 'BADINAS, Jean Morella A.', sr_code: "20-03580", password: '123', email_address: "20-03580@g.batstate-u.edu.ph" },
            { name: 'BOBILES, Carl Justine T.', sr_code: "20-01983", password: '123', email_address: "20-01983@g.batstate-u.edu.ph" },
            { name: 'CABALES, Desiree Diane O.', sr_code: "20-06494", password: '123', email_address: "20-06494@g.batstate-u.edu.ph" },
            { name: 'CAGAYAN, Arison Carl I.', sr_code: "20-06487", password: '123', email_address: "20-06487@g.batstate-u.edu.ph" },
            { name: 'CAPONPON, Aeron A.', sr_code: "20-00413", password: '123', email_address: "20-00413@g.batstate-u.edu.ph" },
            { name: 'CARANDANG, Karylle Gianne B.', sr_code: "20-07597", password: '123', email_address: "20-07597@g.batstate-u.edu.ph" },
            { name: 'CARINGAL, Rexine Anne L.', sr_code: "20-07961", password: '123', email_address: "20-07961@g.batstate-u.edu.ph" },
            { name: 'CASTILLO, Ma. Veronica M.', sr_code: "20-02951", password: '123', email_address: "20-02951@g.batstate-u.edu.ph" },
            { name: 'CRUZ, Renz Julliana R. ', sr_code: "20-04249", password: '123', email_address: "20-04249@g.batstate-u.edu.ph" },
            { name: 'CUASAY, Psyrll Fritz C.', sr_code: "20-00898", password: '123', email_address: "20-00898@g.batstate-u.edu.ph" },
            { name: 'CUERDO, Key Ann G.', sr_code: "20-08662", password: '123', email_address: "20-08662@g.batstate-u.edu.ph" },
            { name: 'CUSI, Dzaralyn Joy M.', sr_code: "20-09831", password: '123', email_address: "20-09831@g.batstate-u.edu.ph" },
            { name: 'DAGLI, Marianne Nicole A.', sr_code: "20-03542", password: '123', email_address: "20-03542@g.batstate-u.edu.ph" },
            { name: 'DALISAY, Dhenver John G.', sr_code: "20-06490", password: '123', email_address: "20-06490@g.batstate-u.edu.ph" },
            { name: 'DE RAMA, Charles Noah', sr_code: "20-04455", password: '123', email_address: "20-04455@g.batstate-u.edu.ph" },
            { name: 'DE TORRES, Mhel Yrvin Z.', sr_code: "20-01768", password: '123', email_address: "20-01768@g.batstate-u.edu.ph" },
            { name: 'EGUIA, John Anthony D.', sr_code: "20-09398", password: '123', email_address: "20-09398@g.batstate-u.edu.ph" },
            { name: 'ENDOZO, Dixie Mae C.', sr_code: "20-03759", password: '123', email_address: "20-03759@g.batstate-u.edu.ph" },
            { name: 'ENERO, Divina Joyce C.', sr_code: "20-08879", password: '123', email_address: "20-08879@g.batstate-u.edu.ph" },
            { name: 'ESCOBER, Marc Ian', sr_code: "20-05166", password: '123', email_address: "20-05166@g.batstate-u.edu.ph" },
            { name: 'FERNANDO, Janzen Izzy L.', sr_code: "20-02262", password: '123', email_address: "20-02262@g.batstate-u.edu.ph" },
            { name: 'FORTUS, Angeline R.', sr_code: "20-03175", password: '123', email_address: "20-03175@g.batstate-u.edu.ph" },
            { name: 'GARILLO, Johndel Dave C.', sr_code: "20-05213", password: '123', email_address: "20-05213@g.batstate-u.edu.ph" },
            { name: 'GARING, Leandro M.', sr_code: "20-08379", password: '123', email_address: "20-08379@g.batstate-u.edu.ph" },
            { name: 'GLORIA, Patricia Isabelle C.', sr_code: "20-07174", password: '123', email_address: "20-07174@g.batstate-u.edu.ph" },
            { name: 'JALANDONI, Regina A.', sr_code: "20-04764", password: '123', email_address: "20-04764@g.batstate-u.edu.ph" },
            { name: 'LABAR, Kate Dianne Liz D.', sr_code: "20-09818", password: '123', email_address: "20-09818@g.batstate-u.edu.ph" },
            { name: 'LANDICHO, Rhezel', sr_code: "20-07122", password: '123', email_address: "20-07122@g.batstate-u.edu.ph" },
            { name: 'MAGADIA, Mark Vincent A.', sr_code: "20-01622", password: '123', email_address: "20-016225@g.batstate-u.edu.ph" },
            { name: 'MANALO, Rizza Mae S.', sr_code: "20-03800", password: '123', email_address: "20-03800@g.batstate-u.edu.ph" },
            { name: 'MENDOZA, Gerenz R.', sr_code: "20-07800", password: '123', email_address: "20-07800@g.batstate-u.edu.ph" },
            { name: 'ORDONEZ, Monica Paula G.', sr_code: "20-02209", password: '123', email_address: "20-02209@g.batstate-u.edu.ph" },
            { name: 'ORTEGA, Alliyah Gwyneth', sr_code: "20-09004", password: '123', email_address: "20-09004@g.batstate-u.edu.ph" },
            { name: 'PAJORA, John Carlo S.', sr_code: "20-01593", password: '123', email_address: "20-01593@g.batstate-u.edu.ph" },
            { name: 'QUINTO, Paul Kenneth S.', sr_code: "20-03192", password: '123', email_address: "20-03192@g.batstate-u.edu.ph" },
            { name: 'RAMOS, Errol James R.', sr_code: "20-09602", password: '123', email_address: "20-09602@g.batstate-u.edu.ph" },
            { name: 'RESURRECCION, Sophia Nicole P. ', sr_code: "20-07451", password: '123', email_address: "20-07451@g.batstate-u.edu.ph" },
            { name: 'REYES, Rhey Val V.', sr_code: "20-01119", password: '123', email_address: "20-01119@g.batstate-u.edu.ph" },
            { name: 'TAMAYO, Lance Lemuel C.', sr_code: "20-08324", password: '123', email_address: "20-08324@g.batstate-u.edu.ph" },
            {name: 'YEMA, Kimberly Kate D.', sr_code: "20-02803", password: '123', email_address: "20-02803@g.batstate-u.edu.ph"},
          ];
          return StudentAccount.bulkCreate(initialData);
        }
      })
      .then(() => {
        console.log('Student data seeded successfully.');
      })
      .catch(error => {
        console.error('Error seeding admin data:', error);
      });
  };