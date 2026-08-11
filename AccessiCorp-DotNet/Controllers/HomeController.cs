using Microsoft.AspNetCore.Mvc;

namespace AccessiCorp_DotNet.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Services(string id)
        {
            ViewBag.SelectedId = id ?? "";
            return View();
        }

        public IActionResult Directory(string search)
        {
            ViewBag.Search = search ?? "";
            return View();
        }

        public IActionResult Faqs()
        {
            return View();
        }

        public IActionResult Audit()
        {
            return View();
        }
    }
}
