module.exports = function taxis(pool) {

    /**
        * Workflow
        * 1 - search for the user 
        * 2 - get their id -> delete all in shift
        * 3 - insert to the shift new ids
        * 4 - query * days selected return their ids with state: disable
        * 5 - {name: Thur, id: 5, state: checked}
        */

    async function addUser(name) {

        await pool.query('INSERT INTO players_table (names) values ($1)', [name])

    };

    async function getIdOfUser(name) {
        try {
            const selectIdQ = await pool.query('SELECT id FROM  players_table WHERE names = $1', [name])

            return selectIdQ.rows[0].id
        } catch (error) {
            return await dontReturnMe(name)
        }

    };

    const dontReturnMe = async (name) => {
        await addUser(name);
        const selectIdQ = await pool.query('SELECT id FROM   players_table WHERE names = $1', [name])
        return selectIdQ.rows[0].id
    }


    async function addSign(signName) {

        await pool.query('INSERT INTO taxisigns_table ( signname) values ($1)', [signName])

    };

    async function getAllAggregate() {

        const selectIdQ = await pool.query('SELECT * FROM playertaxisigns_table')
        // console.log(selectIdQ.rows[0].id)
        return selectIdQ.rows;

    };



    async function deleteAllAggregate(id) {
        await pool.query('delete from playertaxisigns_table where player_id = $1', [id])
    };


    /**
   * 
   * @param {Array} sign_id - user selected days
   * @param {Integer} names_id 
   * 
   * @returns nothing
   */

    async function addNewShift(sign_id, names_id, player_score) {
        // console.log(days_id);

        //array not a function

        await sign_id.forEach(async (id) => {

            await insertNewDaysId(id, names_id, player_score)

        });

    };

    const wf = async (name, sign_id, player_score) => {


        var userId = await getIdOfUser(name)
         console.log({ userId })

        // if its true get id of user
        if (userId) {

            // delete from all shift if its user is  there
            await deleteAllAggregate(userId)

            // then add new shift add days_id and userID
            await addNewShift(sign_id, userId, player_score)
            // await    insertNewDaysId()
        }

        //return get all shift with all the shifts in a table
        return await getAllAggregate();

    };

    async function insertNewDaysId(sign_id, names_id, player_score) {

        await pool.query('INSERT INTO playertaxisigns_tables (player_id, taxisigns_id, player_score) values ($1,$2,$3)', [sign_id, names_id, player_score])

    };



















    // async function searchUser(name) {
    //     const selectQuery = await pool.query('SELECT names FROM waiters_names WHERE names = $1', [name])
    //     return selectQuery.rows[0];

    // };


























    // async function insertNewNameId(name) {

    //     await pool.query('INSERT INTO waiters_shifts (waiters_id) values ($1)', [name])

    // };





    async function allDaySpecificUser(id) {
        // *  - should return an object ----{name: Thur, id: 5, state: checked}

        //console.log(name)
        //   const idFunction = await  searchUser()

        const selectIdQ = await pool.query(`select weekly_days.days_bookings from weekly_days 
        join waiters_shifts
         on  waiters_shifts.days_id = weekly_days.id 
         join waiters_names
         on  waiters_shifts.waiters_id = waiters_names.id where waiters_id = $1`, [id])
        //  console.log(selectIdQ.rows);

        return selectIdQ.rows;
    };

    async function waitersDayOneDay() {

        let specificDay = await pool.query(`select * from waiters_names
    join waiters_shifts   
      on waiters_shifts.waiters_id = waiters_names.id
    join  weekly_days
    on waiters_shifts.days_id = weekly_days.id`
        )
        //console.log(specificDay.rows)
        return specificDay.rows;
    };

    // async function listOfDaysAndNamesObject() {

    //     const results = await pool.query('select * from  weekly_days')

    //     const weekdays = results.rows
    //     const shift = await waitersDayOneDay()
    //     //console.log(daysRow)

    //     weekdays.forEach(async function (day) {

    //         day.waiters = [];

    //         shift.forEach(waiter => {

    //             if (day.days_bookings === waiter.days_bookings) {

    //                 day.waiters.push(waiter)

    //             } if (day.waiters.length === 0) {

    //                 day.color = "white"
    //             }

    //             else if (day.waiters.length <= 2) {

    //                 day.color = "yellow"
    //             }

    //             else if (day.waiters.length >= 2 && day.waiters.length <= 3) {

    //                 day.color = "lime"
    //             }
    //             else {

    //                 day.color = "red"
    //             }


    //         });


    //     });

    //     return weekdays;

    // }

    async function dayTogether() {

        const results = await pool.query('select * from  weekly_days')

        return results.rows;

    };

    async function resetFtn() {

        // console.log(userName)
        const dayOfWeeks = await dayTogether();
        //delete from joined table
        let restart = await pool.query('DELETE FROM waiters_shifts');

        return restart;
    };

    async function buttonMsg() {

        var buttonpressed = false;

        if (!buttonpressed) {

            await resetFtn();

            return "database has been cleared...!"
            // console.log(userName)
            const dayOfWeeks = await instance.dayTogether();
        }

    };

    async function similar(name) {

        let insideDb = await pool.query('SELECT * FROM waiters_name WHERE names = ($1)', [name])

        // to check if it exists you check it by === 1
        return insideDb.rowCount == 1;

    };

    async function buttonMessage() {

        var buttonpressed = false;

        if (!buttonpressed) {

            return "Dear waiter, your booking has been successfully submited..!"

        }


    };

    return {

        // searchUser,
        getIdOfUser,
        deleteAllAggregate,
        getAllAggregate,
        // insertNewNameId, 
        buttonMessage,
        waitersDayOneDay,
        resetFtn,
        buttonMsg,
        similar,
        wf,
        addUser,
        addNewShift,
        // listOfDaysAndNamesObject,
        dayTogether,
        allDaySpecificUser,

    }

};




























