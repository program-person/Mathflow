from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sympy
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application


app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:5173",

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class FormulaRequest(BaseModel):
    formula: str

@app.post("/solve")
async def solve_equation(req: FormulaRequest):
    try:
        transformation = (standard_transformations + (implicit_multiplication_application,))
        expr_str = req.formula

        if "=" in expr_str:
            left,right = expr_str.split("=")
            expr = parse_expr(left, transformations=transformation) - parse_expr(right, transformations=transformation)
            is_equation = True
        else:
            expr = parse_expr(expr_str, transformations=transformation)
            is_equation = False
        
        symbols = list(expr.free_symbols)
        variable = str(symbols[0]) if symbols else "x"

        result_data = {
            "epression" : str(expr),
            "variable":variable
        }

        if is_equation:
            solutions = sympy.solve(expr)
            result_data["type"] = "equation"
            result_data["solutions"] = [str(sol) for sol in solutions]
        else:
            simplified = sympy.simplify(expr)
            result_data["type"] = "caluculation"
            result_data["result"] = str(simplified)
        
        return result_data
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



