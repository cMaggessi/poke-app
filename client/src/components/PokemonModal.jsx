import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import typeColors from "../util/typeColors";

export function PokemonModal({ open, handleClose, pokemon }) {


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 w-1/2 p-6">
        <div className="flex">
          <div className="w-1/2 p-2 border-black border-2 border-l-0 border-t-0 border-b-0 border-r-4">
            <img
              src={pokemon?.image}
              alt={`Image of ${pokemon?.name}`}
              className="block mx-auto w-[200px] h-[200px]"
            />
          </div>

          <div className="text-xl w-1/2 p-2 bg-slate-200 flex flex-col gap-4">
            <Typography>Pokemon ID: {pokemon?.id}</Typography>

            <Typography>Pokemon name: {pokemon?.name}</Typography>
            <hr className="border-black" />
            <p className="mb-0">Abilities:</p>

            <ul className="text-md font-semibold italic">
              {pokemon?.abilities?.map((t) => (
                <li key={t.ability.name}>{t.ability.name}</li>
              ))}
            </ul>
            <hr className="border-black" />
            <div>
              Type:
              <p style={{ color: typeColors[pokemon?.type] || "black" }}>{pokemon?.type}</p>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
