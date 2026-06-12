const pool = require("../db/db");
const { getIO } = require("../socket");
const createNotification = async (req, res) => {

  try {

    const { message } = req.body;

    const userId = req.user.id;

    const newNotification = await pool.query(
      `
      INSERT INTO notifications(user_id, message)
      VALUES($1, $2)
      RETURNING *
      `,
      [userId, message]
    );

    // realtime emit
    const io = getIO();

    io.to(`user_${userId}`).emit(
         "new_notification",
        {
            message: newNotification.rows[0].message
        }
    );

    res.status(201).json({
      success: true,
      notification: newNotification.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

const getNotifications = async (req, res) => {

  try {

    const userId = req.user.id;

    const notifications = await pool.query(
      `
      SELECT * FROM notifications
      WHERE user_id=$1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json({
      notifications: notifications.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

module.exports = {
  createNotification,
  getNotifications
};