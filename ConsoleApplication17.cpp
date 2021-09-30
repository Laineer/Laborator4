#include <iostream>
#include <iomanip>
#include <cmath>

using namespace std;

const double PI = 3.14;

double f(double x) {
	return sqrt(pow(sin(x), 2) + pow(x, 3) + 8);
}

double Trapez(double a, double b, int n) {
	double h = (b - a) / n;

	double sum = f(a) + f(b);

	for (int i = 1; i <= n - 1; i++) {
		sum += 2 * f(a + i * h);
	}

	sum *= h / 2;
	return sum;
}

int main()
{
	double a = 0, b = (3 * PI) / 2;

	int n = 5000;
	cout << Trapez(a, b, n) << endl;



}
