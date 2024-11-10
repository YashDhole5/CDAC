The backend is used of MySql which has following table named 'projects' and schema as below
 desc projects;
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type         | Null | Key | Default           | Extra                                         |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id          | int          | NO   | PRI | NULL              | auto_increment                                |
| title       | varchar(255) | NO   |     | NULL              |                                               |
| description | text         | NO   |     | NULL              |                                               |
| user_id     | int          | YES  |     | NULL              |                                               |
| created_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
6 rows in set (0.12 sec)
