using System.Web.Mvc;

namespace AddressBookService.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Address Book Service";

            return View();
        }
    }
}
