package handlers

import (
	"net/http"
	"strings"
)

// LegacyRedirectHandler handles all legacy v3 routes and redirects them directly
// This bypasses the language system since legacy URLs don't have language prefixes
func LegacyRedirectHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Map of legacy paths to their new destinations
		legacyRedirects := map[string]string{
			// Main legacy paths
			"/v3/":								"/home",
			"/v3/inov/":							"/home",
			"/v3/postij/":							"/news",
			"/v3/projects/":						"/programs_and_projects",
			"/v3/msgs/":							"/news",
			"/v3/msgs1/":							"/news",
			"/v3/msgs2/":							"/news",
			"/v3/actual/":							"/news",
			"/v3/110Y/":							"/news",
			"/v3/100Y/":							"/news",
			"/v3/anny/":							"/news",
			"/v3/newest/":							"/news",
			"/v3/db/":							"/documents#budget",
			"/v3/matb/":							"/about_us",
			"/v3/un/":							"/about_us#school_council",
			"/v3/os/":							"/documents#public_council",
			"/v3/sd/":							"/about_us#cooperation",
			"/v3/sh/":							"/about_us#cooperation",
			"/v3/doc/":							"/documents",
			"/v3/obi/":							"/documents",
			"/v3/adus/":							"/documents",
			"/v3/specs/":							"/specialties", // Not developed
			"/v3/up/":							"/academic_schedule",
			"/v3/pp/":							"/admission",
			"/v3/dos/":							"/professional_education",
			"/v3/nip/":							"/professional_education",
			"/v3/tup/":							"/professional_education",
			"/v3/dwanaiswtoklasnici/":					"/professional_education",
			"/v3/sfo/":							"/professional_education",
			"/v3/dzi/":							"/dzi",
			"/v3/dki/":							"/zdippk",
			"/v3/natoofl/":							"/home",
			"/v3/prav/":							"/documents#rules",
			"/v3/graf/":							"/document_templates",
			"/v3/stip/":							"/scholarships",
			"/v3/utf/":							"/news",
			"/v3/ednev/":							"https://www.shkolo.bg/",
			"/v3/drej/":							"/documents#schedules",
			"/v3/zdravni/":							"/documents",
			"/v3/dir/":							"/home",
			"/v3/pdir/":							"/about_us#leadership",
			"/v3/teachers/":						"/about_us",
			"/v3/ps/":							"/contacts",
			"/v3/obuch_teach/":						"/about_us#qualifications",
			"/v3/bpdocs/":							"/documents#buyer_profile",
			"/v3/contacts/":						"/contacts",
			"/v3/baz17/":							"/news",
			"/v3/baz16/":							"/news",
			"/v3/baz15/":							"/news",
			"/v3/baz14/":							"/news",
			"/v3/picc/cb16/":						"/news",
		}

		// Get the request path
		path := r.URL.Path
		
		// Ensure path ends with / for directory paths (except file paths)
		if !strings.Contains(path, ".") && !strings.HasSuffix(path, "/") {
			path = path + "/"
		}

		// Check if we have a redirect for this path
		if newPath, exists := legacyRedirects[path]; exists {
			// Use permanent redirect (301) for SEO
			http.Redirect(w, r, newPath, http.StatusMovedPermanently)
			return
		}

		// If no specific match found but starts with /v3/, redirect to home
		if strings.HasPrefix(path, "/v3/") {
			http.Redirect(w, r, "/home", http.StatusMovedPermanently)
			return
		}

		// If no match, continue to next handler (shouldn't happen for /v3/ paths)
		http.NotFound(w, r)
	})
}
