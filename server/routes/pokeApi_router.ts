// routes/pokeApi_router.ts

import { Router, Request, Response } from "express";

const router = Router();

const baseURL = `https://pokeapi.co/api/v2/pokemon/`;
const pokeLimit = `?limit=150`

router.get("/hello", (req: Request, res: Response) => {
  res.send("Welcome to PokeAPI!");
});

router.get("/pokemon", async (req: Request, res: Response) => {
  try {
    const pokeData = await fetch(baseURL+pokeLimit);

    const pokeJSON : any = await pokeData.json();

    
    const orderedPokemons = pokeJSON.results.sort((a: any, b: any) => a.name.localeCompare(b.name));
    
    res.status(200).json(orderedPokemons)



  } catch (error) {
    throw new Error("Error fetching pokeData: " + error);
  }
});

router.get("/pokemon/:name", async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const pokeResponse = await fetch(baseURL + name.toLowerCase());

    const pokeJson: any = await pokeResponse.json();

    if (pokeJson === null || pokeJson === undefined) {
      return res.json({ message: "No pokemon found with name: " + name });
    }

    res.json(pokeJson);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
