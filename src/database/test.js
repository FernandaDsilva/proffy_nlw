const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //inserir dados
    proffyValue = {
        name: "Fernanda Dias",
        avatar: "https://lh3.googleusercontent.com/ogw/ADGmqu_bW9SnQfHiPm-z_KxkxwWRWPNpUmoIbMBskkAL=s83-c-mo",
        whatsapp: "43996870552",
        bio: "Entusiasta das melhores tecnologias de química avançada Apaixonado por explodir coisas em laboratórios e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
    }
    classValue = {
        subject: 1,
        cost: "20",
        // proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados, apos cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })

    // consultar os dados inseridos

    // todos os proffys

    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo é das 88h as 18h
    // o horário do time_from é (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday ="0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    console.log(selectClassesSchedules)
})