import asyncio
import os
import sys
from logging.config import fileConfig

from dotenv import load_dotenv
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

# Para que Python encuentre el paquete "app" al correr Alembic desde la raíz
sys.path.append(os.getcwd())

# Carga las variables del .env (DATABASE_URL, etc.)
load_dotenv()

# Nuestras tablas reales (Protein, Molecule, Prediction)
from app.infrastructure.db.models import Base

# Objeto de configuración de Alembic, viene de alembic.ini
config = context.config

# Sobreescribe la URL del alembic.ini con la del .env (no queremos hardcodear)
config.set_main_option("sqlalchemy.url", os.environ["DATABASE_URL"])

# Configura el logging (para que Alembic muestre mensajes en consola)
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Le dice a Alembic qué tablas debe comparar/crear (las de Base)
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Modo offline: genera el SQL sin conectarse de verdad a la base."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    """Corre las migraciones usando una conexión ya abierta."""
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Modo online async: crea el engine y ejecuta las migraciones de verdad."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Punto de entrada para el modo online (el que usamos normalmente)."""
    asyncio.run(run_async_migrations())


# Alembic decide solo si corre en modo offline u online
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()