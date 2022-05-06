export default function HandleResponseToJson(req, res, next) {
    res.type("application/json; charset=utf-8");
    next();
}