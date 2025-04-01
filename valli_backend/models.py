import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os
import time

load_dotenv()

class farmer_db:
    def __init__(self, conn_params):
        attempts = 5
        while attempts:
            try:
                self.conn = psycopg2.connect(**conn_params)
                break
            except psycopg2.OperationalError as e:
                attempts -= 1
                print("Postgres not ready, retrying in 10 seconds...")
                time.sleep(10)
        else:
            raise Exception("Could not connect to Postgres after multiple attempts")
        self._create_tables()

    def _create_tables(self):
        """
        Creates or updates the necessary tables.
        Adjusted to fix trailing commas and match your new structure.
        """
        with self.conn.cursor() as cursor:
            self.conn.autocommit = True
            try:
                # Ensure pgcrypto extension is enabled for gen_random_uuid()
                cursor.execute('''
                    DO $$ 
                    BEGIN 
                        IF NOT EXISTS (
                          SELECT 1 
                          FROM pg_extension 
                          WHERE extname = 'pgcrypto'
                        ) THEN
                            CREATE EXTENSION pgcrypto;
                        END IF;
                    END $$;
                ''')

                # USERS table: 
                #   id, createdAt, name, rank, location, image
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS public.users (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        "email" TEXT UNIQUE,
                        "password" TEXT,
                        "name" TEXT,
                        "rank" TEXT,
                        "location" TEXT,
                        "image" TEXT
                    );
                ''')

                # CONVERSATIONS table:
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS public.conversations (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        person_id UUID,
                        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        conversation JSONB
                    );
                ''')

                # API_DATA table (JSONB columns for your new structure):
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS public.api_data (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    person_id UUID,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    short_range_forecast JSONB NOT NULL,
                    now_cast_forecast JSONB,
                    aggregated_data JSONB
                );

                ''')

                # COMMUNITY table:
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS public.community (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        person_id UUID,
                        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        "title" TEXT,
                        "description" TEXT,
                        "image" TEXT,
                        "likes" INT,
                        "comments" JSONB
                    );
                ''')

                # PROJECTS table:
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS public.projects (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        person_id UUID,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        overview_data JSONB,
                        project_details_data JSONB,
                        health_metrics_data JSONB,
                        water_data JSONB,
                        financial_data JSONB,
                        recommendation_data JSONB,
                        insights_data JSONB
                    );

                ''')
            except Exception as e:
                print("Error creating tables:", e)
            finally:
                self.conn.autocommit = False

    # ------------- USERS CRUD ------------- #
    def get_users(self):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.users")
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_user_by_email(self, email):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.users WHERE email = %s", (email,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e
    
    def get_user_by_id(self, user_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.users WHERE id = %s", (user_id,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e
    
    def register_user(self, email, password, name, location):
        """
        Register a new user with email and password.
        """
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO public.users ("email", "password", "name", "rank", "location")
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                ''', (email, password, name, "user", location))
                new_id = cursor.fetchone()[0]
            self.conn.commit()
            return new_id
        except Exception as e:
            self.conn.rollback()
            raise e

    def insert_user(self, name, rank, location, image):
        """
        Insert a new user into the 'users' table.
        The old code had columns not in your current table (e.g., latitude, crops).
        This is now minimal to match 'public.users' definition.
        """
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO public.users ("name", "rank", "location", "image")
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                ''', (name, rank, location, image))
                new_id = cursor.fetchone()[0]
            self.conn.commit()
            return new_id
        except Exception as e:
            self.conn.rollback()
            raise e

    def update_user(self, user_id, name, rank, location, image):
        """
        Update an existing user. 
        """
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    UPDATE public.users
                    SET "name" = %s, "rank" = %s, "location" = %s, "image" = %s
                    WHERE id = %s
                ''', (name, rank, location, image, user_id))
            self.conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            self.conn.rollback()
            raise e

    def delete_user(self, user_id):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute("DELETE FROM public.users WHERE id = %s", (user_id,))
            self.conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_user_by_id(self, user_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.users WHERE id = %s", (user_id,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e

    # ------------- CONVERSATIONS CRUD ------------- #
    def insert_chat_conversation(self, conversation):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO public.conversations (conversation)
                    VALUES (%s)
                    RETURNING id;
                ''', (psycopg2.extras.Json(conversation),))
                new_id = cursor.fetchone()[0]
            self.conn.commit()
            return new_id
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_all_chat_conversations(self):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.conversations")
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e

    def update_chat_conversation(self, conversation_id, conversation):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    UPDATE public.conversations
                    SET conversation = %s
                    WHERE id = %s
                ''', (psycopg2.extras.Json(conversation), conversation_id))
            self.conn.commit()
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_chat_conversation_by_id(self, conversation_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.conversations WHERE id = %s", (conversation_id,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_chat_conversations_by_person_id(self, person_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.conversations WHERE person_id = %s", (person_id,))
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e
        
    # ------------- COMMUNITY CRUD ------------- #
    def insert_community(self, title, description, image, likes, comments):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO public.community ("title", "description", "image", "likes", "comments")
                    VALUES (%s, %s, %s, %s, %s) 
                    RETURNING id;
                ''', (title, description, image, likes, psycopg2.extras.Json(comments)))
                new_id = cursor.fetchone()[0]
            self.conn.commit()
            return new_id
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_community_by_id(self, community_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.community WHERE id = %s", (community_id,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e
    
    def get_community_by_person_id(self, person_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.community WHERE person_id = %s", (person_id,))
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e
        

    def update_community(self, community_id, title, description, image, likes, comments):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    UPDATE public.community
                    SET "title" = %s, "description" = %s, "image" = %s, "likes" = %s, "comments" = %s
                    WHERE id = %s
                ''', (title, description, image, likes, psycopg2.extras.Json(comments), community_id))
            self.conn.commit()
        except Exception as e:
            self.conn.rollback()
            raise e

    def delete_community_by_id(self, community_id):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute("DELETE FROM public.community WHERE id = %s", (community_id,))
            self.conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_all_community_posts(self):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.community")
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e
            
    # ------------- API_DATA CRUD ------------- #
    def insert_api_data(
        self,
        person_id,                  # optional
        short_range_forecast,           # required
        now_cast_forecast=None,         # optional
        aggregated_data=None            # optional, holds e.g. growth_efficiency, frost_risk, etc.
    ):
        """
        Insert a new row into the api_data table with the new simplified structure:
        - short_range_forecast (JSONB, NOT NULL)
        - now_cast_forecast (JSONB)
        - aggregated_data (JSONB)
        """
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO public.api_data (
                        short_range_forecast,
                        person_id,
                        now_cast_forecast,
                        aggregated_data
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                ''', (
                    psycopg2.extras.Json(short_range_forecast),
                    person_id,
                    psycopg2.extras.Json(now_cast_forecast) if now_cast_forecast else None,
                    psycopg2.extras.Json(aggregated_data) if aggregated_data else None
                ))
                new_id = cursor.fetchone()[0]
            self.conn.commit()
            return new_id
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_all_api_data(self):
        """
        Return all rows from api_data.
        """
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.api_data ORDER BY created_at DESC")
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e
        
    def get_api_data_by_person_id(self, person_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.api_data WHERE person_id = %s", (person_id,))
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e

    def get_api_data_by_id(self, data_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.api_data WHERE id = %s", (data_id,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e

    def update_api_data(
        self,
        data_id,
        person_id=None,
        short_range_forecast=None,
        now_cast_forecast=None,
        aggregated_data=None
    ):
        """
        Update the specified row in api_data, setting only columns provided.
        - short_range_forecast (JSONB)
        - now_cast_forecast (JSONB)
        - aggregated_data (JSONB)
        """
        try:
            # Build dynamic query
            updates = []
            params = []

            if short_range_forecast is not None:
                updates.append("short_range_forecast = %s")
                params.append(psycopg2.extras.Json(short_range_forecast))

            if now_cast_forecast is not None:
                updates.append("now_cast_forecast = %s")
                params.append(psycopg2.extras.Json(now_cast_forecast))

            if aggregated_data is not None:
                updates.append("aggregated_data = %s")
                params.append(psycopg2.extras.Json(aggregated_data))
            
            if person_id is not None:
                updates.append("person_id = %s")
                params.append(person_id)
            # If no updates were provided, we can skip the update

            if not updates:
                # No updates to make
                return False

            # finalize query
            set_clause = ", ".join(updates)
            query = f"UPDATE public.api_data SET {set_clause} WHERE id = %s"
            params.append(data_id)

            with self.conn.cursor() as cursor:
                cursor.execute(query, tuple(params))
            self.conn.commit()
            return True
        except Exception as e:
            self.conn.rollback()
            raise e

    def delete_api_data_by_id(self, data_id):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute("DELETE FROM public.api_data WHERE id = %s", (data_id,))
            self.conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            self.conn.rollback()
            raise e
    
    # ------------- PROJECTS CRUD ------------- #
    def insert_project(self, person_id, overviewData, projectDetailsData, healthMetricsData, waterData, recommendationData, insightsData, financialData):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO public.projects (
                        person_id,
                        overview_data,
                        project_details_data,
                        health_metrics_data,
                        water_data,
                        financial_data,
                        recommendation_data,
                        insights_data
                    ) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                ''', (
                    person_id,
                    psycopg2.extras.Json(overviewData),
                    psycopg2.extras.Json(projectDetailsData),
                    psycopg2.extras.Json(healthMetricsData),
                    psycopg2.extras.Json(waterData),
                    psycopg2.extras.Json(financialData),
                    psycopg2.extras.Json(recommendationData),
                    psycopg2.extras.Json(insightsData)
                ))
                # Fetch the new ID
                new_id = cursor.fetchone()[0]
            self.conn.commit()
            return new_id
        except Exception as e:
            self.conn.rollback()
            raise e
        
    def get_project_by_id(self, project_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.projects WHERE id = %s", (project_id,))
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            self.conn.rollback()
            raise e
        
    def get_projects_by_person_id(self, person_id):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT * FROM public.projects WHERE person_id = %s", (person_id,))
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            self.conn.rollback()
            raise e

    def update_project(self, project_id, person_id, overviewData, projectDetailsData, healthMetricsData, waterData, recommendationData, financialData, insightsData):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute('''
                    UPDATE public.projects
                    SET person_id = %s, overview_data = %s, project_details_data = %s, health_metrics_data = %s, water_data = %s, recommendation_data = %s, insights_data = %s, financial_data = %s
                    WHERE id = %s
                ''', (person_id, psycopg2.extras.Json(overviewData), psycopg2.extras.Json(projectDetailsData), psycopg2.extras.Json(healthMetricsData), psycopg2.extras.Json(waterData), psycopg2.extras.Json(recommendationData), psycopg2.extras.Json(insightsData), psycopg2.extras.Json(financialData), project_id))
            self.conn.commit()
        except Exception as e:
            self.conn.rollback()
            raise e
        
    def delete_project_by_id(self, project_id):
        try:
            with self.conn.cursor() as cursor:
                cursor.execute("DELETE FROM public.projects WHERE id = %s", (project_id,))
            self.conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            self.conn.rollback()
            raise e

    def close(self):
        """
        Close the database connection.
        """
        if self.conn:
            self.conn.close()
            print("Connection closed.")
        else:
            print("No connection to close.")
            
# DB connection parameters
db_params = {
    "dbname": os.getenv("POSTGRES_DB"),
    "user": os.getenv("POSTGRES_USER"),
    "password": os.getenv("POSTGRES_PASSWORD"),
    "host": os.getenv("POSTGRES_HOST"),
    "port": os.getenv("POSTGRES_PORT")
}

print(db_params)

my_farmer_db = farmer_db(db_params)
